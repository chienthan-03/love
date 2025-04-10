import {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { companyCodesLoadMoreSelector } from "../store/selector/settingSelector";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { resetSession } from "../store/slice/forms";
import KeyFormContext from "../context/KeyFormContext";
import {debounce} from "es-toolkit";
import { getCompanyCodeByIdAction } from "../store/actions";
import {
  Input,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  CommandList,
} from "@euroland/ci-shadcn-styleguide";
import { Loader2 } from "lucide-react";
import { appDataContext } from "@euroland/ci-utils";

const ContainerHeight = 256;

type CompanyCodeProps = {
  value: { label: string; value: string };
  onChange?: (value?: { label?: string; value?: string }) => void;
  width?: number;
};
function CompanyCode({
  value = { label: "", value: "" },
  onChange = () => {},
  width = 310,
}: CompanyCodeProps) {
  const [companyNameValue, setCompanyNameValue] = useState<
    string | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);
  const { loadMoreCompanyCodes, loading, isLoadMore } = useSelector(
    companyCodesLoadMoreSelector
  );
  const searchKeywordRef = useRef("");
  const pageNumberRef = useRef(1);
  const dispatch = useDispatch<AppDispatch>();
  const { onChangeFormKey } = useContext(KeyFormContext);

  const options = useMemo(
    () =>
      loadMoreCompanyCodes?.map((companyCode) => ({
        label: companyCode.name,
        value: companyCode.code,
      })) || [],
    [loadMoreCompanyCodes]
  );

  const getCompanyCodes = useCallback(
    (params) => dispatch(getCompanyCodeByIdAction(params)),
    [dispatch]
  );
  useLayoutEffect(() => {
    if (!value) return;
    if (value?.label !== companyNameValue) {
      setCompanyNameValue(value?.label);
    }
  }, [value]);

  const resetForm = () => {
    dispatch(resetSession());
    onChangeFormKey();
  };

  const handleSearchChange = useMemo(
    () =>
      debounce(({ searchValue, pageSize = 20, pageNumber = 1 }) => {
        if (!searchValue.trim()) return;
        if (searchValue.length > 2) {
          getCompanyCodes({ companyCode: searchValue, pageSize, pageNumber });
        }
      }, 300),
    []
  );
  const handleChange = (value) => {
    console.log({ value });
    setCompanyNameValue(value);
  };
  const handleSelect = (value, option) => {
    resetForm();
    onChange(option);
  };
  const handleBlur = () => {
    const selectedOption = options.find(
      (opt) =>
        opt.label?.toLocaleLowerCase() === companyNameValue?.toLocaleLowerCase()
    );
    if (!selectedOption) {
      setCompanyNameValue(value.label);
      searchKeywordRef.current = value.label;
      return;
    }
    searchKeywordRef.current = selectedOption.value;
    setCompanyNameValue(selectedOption.label);
    if (selectedOption.value === value.value) return;

    resetForm();
    onChange(selectedOption);
  };

  const handleClear = () => {
    resetForm();
    onChange({});
  };

  const handlePopupScroll = (e) => {
    if (!searchKeywordRef.current || !isLoadMore) return;
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1
    ) {
      pageNumberRef.current += 1;
      handleSearchChange({
        searchValue: searchKeywordRef.current,
        pageSize: 20,
        pageNumber: pageNumberRef.current,
      });
    }
  };

  const handleSearch = (searchValue: string) => {
    console.log({ searchValue });
    searchKeywordRef.current = searchValue;
    pageNumberRef.current = 1;
    handleSearchChange({ searchValue, pageSize: 20, pageNumber: 1 });
  };
  const data = appDataContext.get();
  console.log({ data });
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative" style={{ width }}>
        <PopoverTrigger asChild>
          <Input value={companyNameValue} className="text-left" />
        </PopoverTrigger>

        {loading && (
          <Loader2
            className="absolute right-2.5 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground"
            size={16}
          />
        )}

        <PopoverContent className="p-0" style={{ width }}>
          <Command>
            <CommandInput
              placeholder="Search company..."
              onValueChange={(value) => {
                handleChange(value);
                handleSearch(value);
              }}
              onBlur={handleBlur}
            />
            <CommandList>
              <CommandEmpty>No company found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      handleSelect(currentValue, option);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {handlePopupScroll && (
            <div
              onScroll={handlePopupScroll}
              className="overflow-auto max-h-60"
            />
          )}
        </PopoverContent>
      </div>
    </Popover>
  );
}

export default CompanyCode;

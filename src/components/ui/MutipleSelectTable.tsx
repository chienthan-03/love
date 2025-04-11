import React, { useState, useEffect, useMemo, Fragment } from "react";
import { X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge, Button, Checkbox, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, Input } from "@euroland/ci-shadcn-styleguide";
import { useStore } from "../../store/useStore";
import { appDataContext } from "@euroland/ci-utils";

const ITEMS_PER_PAGE = 10;
const INITIAL_SELECTED_COUNT = 3;

const MultiSelectTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [instrumentsWithChecked, setInstrumentsWithChecked] = useState<any[]>([]);

  // Use primitive selectors to avoid infinite loops
  const instrumentsData = useStore(state => state.instruments.data);
  const loading = useStore(state => state.instruments.loading);
  const selectedInstruments = useStore(state => state.selectedInstruments);
  const setSelectedInstruments = useStore(state => state.setSelectedInstruments);
  const fetchInstruments = useStore(state => state.fetchInstruments);
  const { companyCode  } = appDataContext.get();
  // Memoize the instruments array
  const instruments = useMemo(() => Object.values(instrumentsData), [instrumentsData]);

  useEffect(() => {
    fetchInstruments(companyCode);
  }, [fetchInstruments]);

  useEffect(() => {
    if (instruments.length > 0 && instrumentsWithChecked.length === 0) {
      const mapped = instruments.map((instrument: any) => ({
        ...instrument,
        checked: false,
      }));

      const updated = mapped.map((item: any, index: number) =>
        index < INITIAL_SELECTED_COUNT ? { ...item, checked: true } : item
      );
      setInstrumentsWithChecked(updated);
      setSelectedInstruments(updated.slice(0, INITIAL_SELECTED_COUNT));
    }
  }, [instruments, instrumentsWithChecked.length, setSelectedInstruments]);

  const filteredInstruments = useMemo(() => {
    return instrumentsWithChecked.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item?.name?.toLowerCase().includes(query) ||
        item?.symbol?.toLowerCase().includes(query) ||
        item?.marketName?.toLowerCase().includes(query) ||
        item?.isin?.toLowerCase().includes(query)
      );
    });
  }, [instrumentsWithChecked, searchQuery]);

  const totalPages = Math.ceil(filteredInstruments.length / ITEMS_PER_PAGE);
  const paginatedInstruments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredInstruments.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredInstruments, currentPage]);

  const handleCheckboxChange = (id: string) => {
    setInstrumentsWithChecked((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleOpenDialog = () => setIsOpen(true);

  const handleConfirm = () => {
    const newSelectedItems = instrumentsWithChecked.filter((item) => item.checked);
    setSelectedInstruments(newSelectedItems);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setInstrumentsWithChecked((prev) =>
      prev.map((item) => ({
        ...item,
        checked: selectedInstruments.some(
          (selected: any) => selected.id === item.id
        ),
      }))
    );
    setIsOpen(false);
  };

  const handleRemoveTag = (id: string) => {
    setSelectedInstruments(selectedInstruments.filter(item => item.id !== id));
    setInstrumentsWithChecked((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: false } : item
      )
    );
  };

  const handleSelectAllPage = (checked: boolean) => {
    setInstrumentsWithChecked((prev) =>
      prev.map((item) =>
        paginatedInstruments.some((pageItem) => pageItem.id === item.id)
          ? { ...item, checked }
          : item
      )
    );
  };

  if (loading) {
    return <div>Loading instruments...</div>;
  }

  return (
    <Fragment>
      <div
        className="border rounded-md p-1 min-h-10 flex flex-wrap gap-2 cursor-pointer"
        onClick={handleOpenDialog}
      >
        {selectedInstruments.length > 0 ? (
          selectedInstruments.map((item: any) => (
            <Badge
              key={item.id}
              variant="secondary"
              className="flex items-center gap-1 py-1 px-2"
            >
              {item.symbol}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(item.id);
                }}
              />
            </Badge>
          ))
        ) : (
          <span className="text-muted-foreground">
            Click to select instruments...
          </span>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-fit w-[825px]">
          <DialogHeader>
            <DialogTitle>Instrument Information</DialogTitle>
          </DialogHeader>
          <div className="relative mb-4 flex justify-center items-center">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <table className="border-collapse w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-2 text-left w-10">
                  <Checkbox
                    checked={
                      paginatedInstruments.length > 0 &&
                      paginatedInstruments.every((item) => item.checked)
                    }
                    onCheckedChange={(checked) =>
                      handleSelectAllPage(!!checked)
                    }
                  />
                </th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Symbol</th>
                <th className="p-2 text-left">Real time Data</th>
                <th className="p-2 text-left">Market Name</th>
                <th className="p-2 text-left">ISIN</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInstruments.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/30">
                  <td className="p-2">
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleCheckboxChange(item.id)}
                    />
                  </td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.symbol}</td>
                  <td className="p-2">{item.allowRealTime}</td>
                  <td className="p-2">{item.marketName}</td>
                  <td className="p-2">{item.isin}</td>
                </tr>
              ))}
              {paginatedInstruments.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 3) {
                  pageNum = i + 1;
                } else if (currentPage === 1) {
                  pageNum = i + 1;
                } else if (currentPage === totalPages) {
                  pageNum = totalPages - 2 + i;
                } else {
                  pageNum = currentPage - 1 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8"
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <DialogFooter className="sm:justify-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>OK</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default React.memo(MultiSelectTable);
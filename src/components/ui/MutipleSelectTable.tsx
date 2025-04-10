import { useState, useEffect, useMemo, Fragment } from "react";
import { X, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { useInstruments } from "../../hooks/useInstruments";
import { useInstrumentSelector } from "@/hooks/useInstrumentSelector";

const ITEMS_PER_PAGE = 10;
const INITIAL_SELECTED_COUNT = 3;

export default function MultiSelectTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [instruments, setInstruments] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const { instruments: rawInstruments } = useInstruments();
  const { setInstrumentSelector } = useInstrumentSelector();

  useEffect(() => {
    setInstrumentSelector({ selectedInstruments: selectedItems });
  }, [selectedItems, setInstrumentSelector]);

  useEffect(() => {
    if (rawInstruments.length > 0 && instruments.length === 0) {
      const mapped = rawInstruments.map((instrument: any) => ({
        ...instrument,
        checked: false,
      }));

      const updated = mapped.map((item: any, index: number) =>
        index < INITIAL_SELECTED_COUNT ? { ...item, checked: true } : item
      );
      setInstruments(updated);
      setSelectedItems(updated.slice(0, INITIAL_SELECTED_COUNT));
    }
  }, [rawInstruments, instruments.length]);

  const filteredInstruments = useMemo(() => {
    return instruments.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item?.name?.toLowerCase().includes(query) ||
        item?.symbol?.toLowerCase().includes(query) ||
        item?.marketName?.toLowerCase().includes(query) ||
        item?.isin?.toLowerCase().includes(query)
      );
    });
  }, [instruments, searchQuery]);

  const totalPages = Math.ceil(filteredInstruments.length / ITEMS_PER_PAGE);
  const paginatedInstruments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredInstruments.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredInstruments, currentPage]);

  const handleCheckboxChange = (id: string) => {
    setInstruments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleOpenDialog = () => setIsOpen(true);

  const handleConfirm = () => {
    const newSelectedItems = instruments.filter((item) => item.checked);
    setSelectedItems(newSelectedItems);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setInstruments((prev) =>
      prev.map((item) => ({
        ...item,
        checked: selectedItems.some(
          (selected: any) => selected.id === item.id
        ),
      }))
    );
    setIsOpen(false);
  };

  const handleRemoveTag = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
    setInstruments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: false } : item
      )
    );
  };

  const handleSelectAllPage = (checked: boolean) => {
    setInstruments((prev) =>
      prev.map((item) =>
        paginatedInstruments.some((pageItem) => pageItem.id === item.id)
          ? { ...item, checked }
          : item
      )
    );
  };

  return (
    <Fragment>
      {/* Hiển thị danh sách thẻ đã chọn */}
      <div
        className="border rounded-md p-2 min-h-10 flex flex-wrap gap-2 cursor-pointer"
        onClick={handleOpenDialog}
      >
        {selectedItems.length > 0 ? (
          selectedItems.map((item: any) => (
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

      {/* Dialog chọn instrument */}
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
                  <td className="p-2">{item.realTimeData}</td>
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

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  
  type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  
  export const PaginationComponent = ({
    currentPage,
    totalPages,
    onPageChange,
  }: PaginationProps) => {
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    const getPaginationItems = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={() => onPageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return pages;
    };
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePrevious} />
          </PaginationItem>
  
          {getPaginationItems()}
  
          {totalPages > 3 && <PaginationEllipsis />}
  
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
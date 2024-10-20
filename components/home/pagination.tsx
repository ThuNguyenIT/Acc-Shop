import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getPageNumbers = () => {
        const pageNumbers = []
        const showEllipsis = totalPages > 7

        if (showEllipsis) {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push("ellipsis")
                pageNumbers.push(totalPages)
            } else if (currentPage >= totalPages - 3) {
                pageNumbers.push(1)
                pageNumbers.push("ellipsis")
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i)
                }
            } else {
                pageNumbers.push(1)
                pageNumbers.push("ellipsis")
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push("ellipsis")
                pageNumbers.push(totalPages)
            }
        } else {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        }

        return pageNumbers
    }

    const pageNumbers = getPageNumbers()

    return (
        <nav className="flex justify-center items-center space-x-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-none text-gray-500 hover:bg-custom-red border border-gray-300 hover:text-white
                        }`}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
            </Button>
            {pageNumbers.map((number, index) => (
                <React.Fragment key={index}>
                    {number === "ellipsis" ? (
                        <span className="w-10 h-10 flex items-center justify-center">...</span>
                    ) : (
                        <Button
                            variant={currentPage === number ? "default" : "outline"}
                            size="icon"
                            onClick={() => onPageChange(number as number)}
                            // className={`w-10 h-10 ${currentPage === number
                            //     ? "bg-red-500 text-white hover:bg-red-600"
                            //     : "text-gray-700 hover:bg-gray-100"
                            //     }`}
                            className={`w-8 h-8 rounded-none ${currentPage === number ? "bg-custom-red hover:bg-custom-red" : "text-gray-500 hover:bg-custom-red border border-gray-300 hover:text-white"
                                }`}
                        >
                            {number}
                        </Button>
                    )}
                </React.Fragment>
            ))}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 rounded-none text-gray-500 hover:bg-custom-red border border-gray-300 hover:text-white
                        }`}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
            </Button>
        </nav>
    )
}

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage = 20,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) // Total Pokemon count

  const getVisiblePages = () => {
    const pages: Array<number | string> = []
    const windowSize = 1 // Number of pages to show before and after currentPage

    if (totalPages <= 7) {
      // Show all pages if not too many
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    // Always show first page
    pages.push(1)

    // Show left ellipsis if needed
    if (currentPage > 2 + windowSize) {
      pages.push('...')
    }

    // Show window around current page
    for (
      let i = Math.max(2, currentPage - windowSize);
      i <= Math.min(totalPages - 1, currentPage + windowSize);
      i++
    ) {
      pages.push(i)
    }

    // Show right ellipsis if needed
    if (currentPage < totalPages - 1 - windowSize) {
      pages.push('...')
    }

    // Always show last page
    pages.push(totalPages)

    return pages
  }

  const onClickPage = (type: string, page?: string | number) => {
    if (type === 'next') {
      setCurrentPage(Math.max(1, currentPage - 1))
    }
    if (type === 'page' && typeof page === 'number') {
      setCurrentPage(page)
    }
    if (type === 'prev') {
      setCurrentPage(Math.min(totalPages, currentPage + 1))
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onClickPage('next')}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
      >
        <ChevronLeft size={16} />
        <span className="ml-1">Previous</span>
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page+"page"}
          onClick={() => onClickPage('page', page)}
          className={`px-3 py-2 text-sm font-medium rounded-lg ${
            currentPage === page
              ? 'bg-red-500 text-white cursor-pointer'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 cursor-pointer'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onClickPage('next')}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
      >
        <span className="mr-1">Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  )
}

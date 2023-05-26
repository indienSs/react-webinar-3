import {memo, useCallback, useEffect} from "react";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function PaginationButtons() {
  const store = useStore();

  const paginationItems = useSelector(state => ({...state.pagination}));
  const selectedPage = paginationItems.currentPage;

  useEffect(() => {
    store.actions.pagination.setTotalPages();
  }, []);

  const callbacks = {
    setPage: useCallback(num => store.actions.pagination.setPage(num)),
  };

  const cn = bem("PaginationButtons");
  const selectedStyle = pageNumber => {
    if (pageNumber === selectedPage) return cn("button-selected");
    return cn("button");
  };

  return (
    <div className={cn()}>
      {selectedPage + 1 > 2 && (
        <div className={selectedStyle(0)} onClick={() => callbacks.setPage(0)}>
          1
        </div>
      )}
      {selectedPage > 2 && <div className={cn("dots")}>...</div>}

      {selectedPage > 0 && (
        <div className={selectedStyle(selectedPage - 1)} onClick={() => callbacks.setPage(selectedPage - 1)}>
          {selectedPage}
        </div>
      )}
      {paginationItems.totalPages + 1 - selectedPage > 0 && (
        <div className={selectedStyle(selectedPage)} onClick={() => callbacks.setPage(selectedPage)}>
          {selectedPage + 1}
        </div>
      )}
      {paginationItems.totalPages - selectedPage > 0 && (
        <div className={selectedStyle(selectedPage + 1)} onClick={() => callbacks.setPage(selectedPage + 1)}>
          {selectedPage + 2}
        </div>
      )}

      {selectedPage + 2 < paginationItems.totalPages && <div className={cn("dots")}>...</div>}
      {selectedPage + 2 < paginationItems.totalPages + 1 && (
        <div
          className={selectedStyle(paginationItems.totalPages + 1)}
          onClick={() => callbacks.setPage(paginationItems.totalPages)}>
          {paginationItems.totalPages + 1}
        </div>
      )}
    </div>
  );
}

export default memo(PaginationButtons);

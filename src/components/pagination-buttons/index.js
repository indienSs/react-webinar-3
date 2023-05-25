import {memo, useCallback, useEffect, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function PaginationButtons() {
  const store = useStore();

  const paginationItems = useSelector(state => ({...state.pagination}));
  const [selectedPage, setSelectedPage] = useState(paginationItems.currentPage);
  const [middleNumbers, setMiddleNumbers] = useState([1, 2, 3]);

  useEffect(() => {
    store.actions.pagination.setTotalPages();
  }, []);

  const callbacks = {
    setPage: useCallback(num => store.actions.pagination.setPage(num)),
  };

  const cn = bem("PaginationButtons");

  return (
    <div className={cn()}>
      {middleNumbers[0] > 1 && (
        <div className={cn("button-selected")} onClick={() => callbacks.setPage(0)}>
          1
        </div>
      )}
      {middleNumbers[0] - 1 > 1 && <div className={cn("dots")}>...</div>}
      <div className={cn("button")} onClick={() => callbacks.setPage(middleNumbers[0] - 1)}>
        {middleNumbers[0]}
      </div>
      <div className={cn("button")} onClick={() => callbacks.setPage(middleNumbers[1] - 1)}>
        {middleNumbers[1]}
      </div>
      <div className={cn("button")} onClick={() => callbacks.setPage(middleNumbers[2] - 1)}>
        {middleNumbers[2]}
      </div>
      {paginationItems.totalPages - middleNumbers[2] > 1 && <div className={cn("dots")}>...</div>}
      {paginationItems.totalPages > middleNumbers[2] && (
        <div className={cn("button")} onClick={() => callbacks.setPage(paginationItems.totalPages)}>
          {paginationItems.totalPages}
        </div>
      )}
    </div>
  );
}

export default memo(PaginationButtons);

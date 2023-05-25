import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PaginationButtons({}) {

  const cn = bem('PaginationButtons');

  return (
    <div className={cn()}>
      pagination
    </div>
  );
}

// PaginationButtons.propTypes = {
//   sum: PropTypes.number
// };

// PaginationButtons.defaultProps = {
//   sum: 0
// }

export default memo(PaginationButtons);

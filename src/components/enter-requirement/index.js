import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function EnterRequirement({visible, chosenComment, onChoseComment, onNavigate}) {
  
  const cn = bem("EnterRequirement");

  return (
      <div style={{paddingLeft: chosenComment ? 30 : 0}}>
        <div className={cn(visible ? "" : "hidden")}>
          <a onClick={onNavigate} className={cn("link")}>Войдите</a>
          <p>, чтобы иметь возможность {chosenComment ? "ответить" : "комментировать"}.&nbsp;</p>
          {chosenComment && <p className={cn("cancel")} onClick={() => onChoseComment(null)}>Отмена</p>}
        </div>
      </div>
  );
}

EnterRequirement.propTypes = {
  visible: PropTypes.bool,
  onChoseComment: PropTypes.func,
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  onNavigate: PropTypes.func,
};

EnterRequirement.defaultProps = {
  visible: false,
  chosenComment: null,
  onChoseComment: () => {},
  onNavigate: () => {},
};

export default memo(EnterRequirement);

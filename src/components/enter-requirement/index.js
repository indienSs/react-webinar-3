import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import {Link} from "react-router-dom";

function EnterRequirement({link, visible, chosenComment, onChoseComment}) {
  
  const cn = bem("EnterRequirement");

  return (
      <div style={{paddingLeft: chosenComment ? 30 : 0}}>
        <div className={cn(visible ? "" : "hidden")}>
          <Link to={link}>Войдите</Link>
          <p>, чтобы иметь возможность {chosenComment ? "ответить" : "комментировать"}.&nbsp;</p>
          {chosenComment && <p className={cn("cancel")} onClick={() => onChoseComment(null)}>Отмена</p>}
        </div>
      </div>
  );
}

EnterRequirement.propTypes = {
  link: PropTypes.string,
  visible: PropTypes.bool,
  onChoseComment: PropTypes.func,
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]), 
};

EnterRequirement.defaultProps = {
  link: "/login",
  visible: false,
  chosenComment: null,
  onChoseComment: () => {},
};

export default memo(EnterRequirement);

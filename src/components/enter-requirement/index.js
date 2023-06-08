import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import SideLayout from "../side-layout";
import {Link} from "react-router-dom";

function EnterRequirement({link, visible}) {
  
  const cn = bem("EnterRequirement");

  return (
    <SideLayout side="start" padding="big">
      <div className={cn(visible ? "" : "hidden")}>
        <Link to={link}>Войдите</Link>
        <p>, чтобы иметь возможность комментировать</p>
      </div>
    </SideLayout>
  );
}

EnterRequirement.propTypes = {
  link: PropTypes.string,
  visible: PropTypes.bool,
};

EnterRequirement.defaultProps = {
  link: "/login",
  visible: false,
};

export default memo(EnterRequirement);

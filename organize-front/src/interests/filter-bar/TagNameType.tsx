import { getStyleFromType, getStyleFromState } from "../interest/InterestUtils";
import "./FilterBar.css";
export interface TagNTNode{ name: string; category: string, handleRemove: (name:string, category:string)=>void}

const TagNameType: React.FC<TagNTNode> = ({
  name,
  category,
  handleRemove
}) => {

  let styleName:object
  let styleCategory:object = {background: "#8d8980", color: "white"}

  if(category=="T"){
      styleName = getStyleFromType(name)
  }else if(category=="S"){
    styleName = getStyleFromState(name)
  }else if(category=="G"){
    styleName = {background: "#89e3f6", color: "black"}
  }else{
    throw Error("Not valid category")
  }

  return (
    <div className="FilterItem" onClick={()=>handleRemove(name, category)}>
      <span className="FilterItemName" style={styleName}>{name}</span> 
      <span className="FilterItemCategory" style={styleCategory}>{category}</span>
    </div>
  );
};
export default TagNameType;

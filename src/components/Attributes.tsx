import { Component } from "react";
import { Attribute } from "../types/types";
import { toKebabCase } from "../assets/functions";

interface AttributesProps {
  attributes: Attribute[];
  selectedAttributes: { [key: string]: string };
  onAttributeClick?: (attributeId: number, value: string) => void;
  isInteractive?: boolean;
  dataTestId: string;
}

class Attributes extends Component<AttributesProps> {
  render() {
    const {
      attributes,
      selectedAttributes,
      onAttributeClick,
      isInteractive,
      dataTestId,
    } = this.props;

    return attributes?.map((attribute) => (
      <div className="my-2" key={attribute.id}>
        <h3 className="mb-1">{attribute.name}</h3>
        <div
          className="flex space-x-2"
          data-testid={`${dataTestId}-${toKebabCase(attribute.name)}`}
        >
          {attribute.items.map((item) => {
            const isSelected = selectedAttributes[attribute.id] === item.value;
            return attribute.type === "text" ? (
              <button
                key={item.value}
                className={`p-2 border w-16 ${
                  isSelected ? "border-black font-bold" : "border-gray-300"
                } transition`}
                onClick={
                  isInteractive && onAttributeClick
                    ? () => onAttributeClick(attribute.id, item.value)
                    : undefined
                }
                disabled={!isInteractive}
                data-testid={`${dataTestId}-${toKebabCase(
                  attribute.name
                )}-${toKebabCase(item.value)}${isSelected ? "-selected" : ""}`}
              >
                {item.value}
              </button>
            ) : (
              <button
                key={item.value}
                className={`w-8 h-8 ${
                  isSelected
                    ? "border-2 border-black"
                    : "border border-gray-300"
                } transition`}
                onClick={
                  isInteractive && onAttributeClick
                    ? () => onAttributeClick(attribute.id, item.value)
                    : undefined
                }
                style={{ backgroundColor: item.value }}
                disabled={!isInteractive}
                data-testid={`${dataTestId}-${toKebabCase(
                  attribute.name
                )}-${toKebabCase(item.value)}${isSelected ? "-selected" : ""}`}
              />
            );
          })}
        </div>
      </div>
    ));
  }
}

export default Attributes;

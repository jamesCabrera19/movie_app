import { useRef, useCallback, useEffect, useState, useContext } from "react";

import { Context as ThemeContext } from "../context/themeContext";
import { Text } from "./text";
import { MdKeyboardArrowRight } from "./icons";

const MyButtons = ({ buttons }) => {
    const {
        state: { theme },
    } = useContext(ThemeContext);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                borderRadius: 10,
                overflow: "hidden",
                width: "100%",
                marginBottom: 20,
            }}
        >
            {buttons.map((Item, idx) => (
                <div
                    key={idx}
                    onClick={
                        Item.onClick
                            ? Item.onClick({
                                  type: idx === 0 ? Item.label : undefined,
                              })
                            : null
                    }
                    style={{
                        display: "flex",
                        width: "100%",
                        height: 50,
                        backgroundColor: theme.panelBackgroundColor,
                        borderBottom: `1px solid ${theme.backgroundColor}`,
                        cursor: "pointer",
                        // overflow: "clip",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Item.Icon_A
                                size={25}
                                style={{ marginLeft: 10 }}
                                color={theme.fontColorSecondary}
                            />
                            <div
                                style={{
                                    margin: "15px 10px 0 10px",
                                }}
                            >
                                <Text color={theme.fontColor}>
                                    {Item.label}
                                </Text>
                            </div>
                        </div>
                        <div>
                            {Item.Component ? (
                                <Item.Component />
                            ) : (
                                <MdKeyboardArrowRight
                                    color={theme.fontColor}
                                    size={30}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { MyButtons };

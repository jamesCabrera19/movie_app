import React, { useState } from "react";

import { useRouter } from "next/router";

const img_src = `https://image.tmdb.org/t/p/w500/irwQcdjwtjLnaA0iErabab9PrmG.jpg`;

const Context = React.createContext();

function ABC() {
    return (
        <div>
            <h1>hello</h1>
        </div>
    );
}

export default function TestComponent({ children }) {
    const virtualPet = {
        sleepy: true,
        nap: function () {
            this.sleepy = false;
        },
        component: <ABC />,
        params: function (params) {
            this.component.props = params;
        },
    };

    return <Context.Provider value={{}}>{children}</Context.Provider>;
}

import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { ErrorSummary } from "@mtfh/common/lib/components";
import Root from "./root";


const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: Root,
    errorBoundary(err, info, props) {
        return <ErrorSummary id="<%= main %>" title="Error" description="Unable to load <%= projectName %>" />;
    },
});

export const { bootstrap, mount, unmount } = lifecycles;

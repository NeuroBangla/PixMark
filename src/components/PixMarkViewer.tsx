import React from "react";

export interface IPixMarkViewer {
    message?: string;
}

export const PixMarkViewer = ({ message = "hello world" }: IPixMarkViewer) => <div>{message}</div>

import {LoadingOverlay, Paper} from "@mantine/core";
import React from "react";

export const LoadingPage = () => {
    return <Paper>
        <LoadingOverlay visible={true}/>
    </Paper>
}
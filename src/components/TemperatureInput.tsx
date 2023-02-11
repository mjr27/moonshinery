import {NumberInputProps} from "@mantine/core/lib/NumberInput/NumberInput";
import React from "react";
import {NumberInput} from "@mantine/core";

export const TemperatureInput = (props: NumberInputProps & React.RefAttributes<HTMLInputElement>) => {
    return <NumberInput
        {...props}
        maxLength={6}
        precision={2}
        step={0.01}
        minLength={1}
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
    />

}
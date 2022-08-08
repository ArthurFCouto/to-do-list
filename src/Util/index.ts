import { AxiosError } from "axios";

export function modelResponseError(error: AxiosError) {
    const { response, request } = error;
    if (response)
        return {
            error: "An error occurred during the request",
            ...response
        };
    if (request)
        return {
            error: "An error occurred during the request",
            ...request
        };
    return {
        error: "An error occurred during the request",
        status: 500,
        data: {
            error: "Internal server error"
        },
        statusText: "Internal server error"
    };
}

export function FormatDateBR(date: string) {
    return new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export function FormatDateEN(date: string) {
    const newDate = new Date(date);
    const dateReturn = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate() + 1
    );
    return new Date(dateReturn).toLocaleDateString("en-US", { timeZone: "UTC" });
}
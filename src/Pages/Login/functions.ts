import { setCookie } from "nookies";

type State = {
    class: string;
    aria: string;
    icon: string;
}

type Action = {
    status: number;
    message: string;
}

export function AlterClass(state: State, action: Action) {
    const { status, message } = action;
    switch (status) {
        case 100: return {
            class: "alert-primary",
            aria: "Info:",
            icon: "#info-fill",
            message,
        };
        case 200: return {
            class: "alert-success",
            aria: "Success:",
            icon: "#check-circle-fill",
            message,
        };
        case 400: return {
            class: "alert-warning",
            aria: "Warning:",
            icon: "#exclamation-triangle-fill",
            message,
        };
        default: return {
            class: "alert-danger",
            aria: "Danger:",
            icon: "#exclamation-triangle-fill",
            message,
        }
    };
}

export function SaveCookie(name: string, token: string) {
    return new Promise((resolve, reject) => {
        resolve(setCookie(null, name, token, {
            maxAge: 604800,
            path: "/",
        }));
    })
}

export function AlertError(response: any, alterAlertProps: any) {
    const { status, data } = response;
    alterAlertProps({
        status,
        message: `Ops! ${data ? data.error : response.statusText}`,
    });
}
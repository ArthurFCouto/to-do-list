import { AxiosError } from 'axios';
import { setCookie } from 'nookies';

export function modelResponseError(error: AxiosError) {
    const { response, request } = error;
    const errorMessage = 'An error occurred during the request';
    if (response)
        return {
            error: errorMessage,
            ...response
        };
    if (request)
        return {
            error: errorMessage,
            ...request
        };
    return {
        error: errorMessage,
        status: 500,
        data: {
            error: 'Internal server error'
        },
        statusText: 'Internal server error'
    };
}

export function FormatDateBR(date: string) {
    return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

export function FormatDateEN(date: string) {
    const newDate = new Date(date);
    const dateReturn = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate() + 1
    );
    return new Date(dateReturn).toLocaleDateString('en-US', { timeZone: 'UTC' });
}

export function AlterClass(state: any, action: any) {
    const { status, message } = action;
    switch (status) {
        case 100:
            return {
                class: 'alert-primary',
                aria: 'Info:',
                icon: '#info-fill',
                message,
            };
        case 200:
            return {
                class: 'alert-success',
                aria: 'Success:',
                icon: '#check-circle-fill',
                message,
            };
        case 400:
            return {
                class: 'alert-warning',
                aria: 'Warning:',
                icon: '#exclamation-triangle-fill',
                message,
            };
        default:
            return {
                class: 'alert-danger',
                aria: 'Danger:',
                icon: '#exclamation-triangle-fill',
                message,
            };
    }
}

export function SaveCookie(name: string, token: string) {
    return new Promise((resolve, reject) => {
        resolve(setCookie(null, name, token, {
            maxAge: 604800,
            path: '/',
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
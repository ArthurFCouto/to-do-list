import React from 'react';

export function AlertReducer(state: any, action: any) {
  const { display } = action;
  return display ?
    {
      show: true,
      message: action.message,
      error: action.error,
      level: action.level,
    } :
    {
      show: false,
      message: '',
      error: '',
      level: 'info',
    };
}

export function ClassReducer(state: any, action: { status: 'success' | 'danger' | 'primary' | 'warning' }) {
  const { status } = action;
  const response = {
    'success': {
      header: 'bg-success',
      card: 'border-success',
      color: '#198754',
    },
    'danger': {
      header: 'bg-danger',
      card: 'border-danger',
      color: '#DC3545',
    },
    'primary': {
      header: 'bg-primary',
      card: 'border-primary',
      color: '#0D6EFD',
    },
    'warning': {
      header: 'bg-warning',
      card: 'border-warning',
      color: '#FFC107',
    }
  }
  return response[status] || response['success'];
}

export function AlertError(error: any, message: string, alterAlert: React.Dispatch<any>) {
  const { statusText, data } = error;
  alterAlert({
    display: true,
    message: message,
    error: `${statusText} - ${data.error}`,
    level: 'danger',
  });
};
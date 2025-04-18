import { enqueueSnackbar } from 'notistack';

const duration = 3000;

const getSnackbarStyle = (variant) => {
  switch (variant) {
    case "success": return { backgroundColor: "#4CAF50", color: "white" };
    case "error": return { backgroundColor: "#F44336", color: "white" };
    case "warning": return { backgroundColor: "#FF9800", color: "white" };
    case "info": return { backgroundColor: "#2196F3", color: "white" };
    default: return {};
  }
};

const notifyService = {
  success: (message, title = "") => {
    enqueueSnackbar(`${title ? title + ": " : ""}${message}`, {
      variant: 'success',
      autoHideDuration: duration,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      style: getSnackbarStyle('success'),
    });
  },
  error: (message, title = "") => {
    enqueueSnackbar(`${title ? title + ": " : ""}${message}`, {
      variant: 'error',
      autoHideDuration: duration,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      style: getSnackbarStyle('error'),
    });
  },
  info: (message, title = "") => {
    enqueueSnackbar(`${title ? title + ": " : ""}${message}`, {
      variant: 'info',
      autoHideDuration: duration,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      style: getSnackbarStyle('info'),
    });
  },
  warning: (message, title = "") => {
    enqueueSnackbar(`${title ? title + ": " : ""}${message}`, {
      variant: 'warning',
      autoHideDuration: duration,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      style: getSnackbarStyle('warning'),
    });
  }
};

export default notifyService;

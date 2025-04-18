import { useState } from "react"
import { TextField } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
const OpenDialog = ({ name }) => {
    const [open, setOpen] = useState(true)

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>{name}</Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Popup Title</DialogTitle>
                <DialogContent>
                    <TextField label="Enter text" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OpenDialog
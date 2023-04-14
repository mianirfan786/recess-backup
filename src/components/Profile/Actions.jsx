import {useNavigate} from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";
import Notification from "../../icons/Notification";
import Payments from "../../icons/Payments";
import PrivacyPolicy from "../../icons/Privacy";
import DeleteAccount from "../../icons/Delete";
import ResetPassword from "../../icons/ResetPassword";
import RightArrow from "../../icons/RightArrow";
import {ROUTES} from "../../routes";
import {useState} from "react";
import {DeleteUserById} from "../../firebase/functions/user";

const actions = [
    {icon: Notification(), title: "Notifications", link: ROUTES.NOTIFICATIONS},
    {icon: Payments(), title: "Payments", link: ROUTES.PAYMENTS},
    {
        icon: PrivacyPolicy(),
        title: "Privacy Policy",
        link: ROUTES.PRIVACY_POLICY,
    },
    {
        icon: ResetPassword(),
        title: "Reset Password",
        link: ROUTES.RESET_ACCOUNT_PASSWORD,
    },
];

const Actions = () => {
    const navigate = useNavigate();
    const [deletePromptOpen, setDeletePromptOpen] = useState(false);
    const [password, setPassword] = useState("");

    const handleDeleteAccountClickOpen = () => {
        setDeletePromptOpen(true);
    };

    const handleDeleteAccountClose = () => {
        setDeletePromptOpen(false);
    };

    const DeletePersonalAccount = async () => {
        try {
            await DeleteUserById();
            handleDeleteAccountClose();
        } catch (error) {
            console.log("error");
        }
    };

    return (
        <Stack flex={1} gap={1}>
            {actions.map(({icon, title, link}) => (
                <Stack
                    onClick={() => navigate(link)}
                    sx={{cursor: "pointer"}}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    borderRadius="15px"
                    p={2}
                    bgcolor="#ECF5F2"
                    key={title}
                >
                    {icon}
                    <Typography variant="body1" fontWeight="bold">
                        {title}
                    </Typography>
                    <RightArrow/>
                </Stack>
            ))}
            <Stack
                onClick={handleDeleteAccountClickOpen}
                sx={{cursor: "pointer"}}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                borderRadius="15px"
                p={2}
                bgcolor="#ECF5F2"
                key="Delete Account"
            >
                {DeleteAccount()}
                <Typography variant="body1" fontWeight="bold">
                    Delete Account
                </Typography>
                <RightArrow/>
            </Stack>
            <Dialog
                open={deletePromptOpen}
                onClose={handleDeleteAccountClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete your account?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone, and all your data will be lost, including
                        your profile, posts, and comments. If you are sure you want to delete
                        your account, click the "Delete Account" button below.
                        <input
                            style={{
                                display: "block",
                                boxShadow: "none !important",
                                outline: "none !important",
                                backgroundColor: "#ECF5F2",
                                padding: "1rem",
                                borderRadius: "10px",
                                width: "100%",
                                fontSize: "1rem",
                                marginBlock: "2rem 1rem",
                                border: "none",
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password to confirm"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteAccountClose}>Close</Button>
                    <Button onClick={DeletePersonalAccount} autoFocus>
                        Delete Account
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default Actions;

import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import Notification from "../../icons/Notification";
import Payments from "../../icons/Payments";
import PrivacyPolicy from "../../icons/Privacy";
import DeleteAccount from "../../icons/Delete";
import ResetPassword from "../../icons/ResetPassword";
import RightArrow from "../../icons/RightArrow";
import { ROUTES } from "../../routes";

const actions = [
  { icon: Notification(), title: "Notifications", link: ROUTES.NOTIFICATIONS },
  { icon: Payments(), title: "Payments", link: ROUTES.PAYMENTS },
  {
    icon: PrivacyPolicy(),
    title: "Privacy Policy",
    link: ROUTES.PRIVACY_POLICY,
  },
  {
    icon: DeleteAccount(),
    title: "Delete Account",
    link: ROUTES.DELETE_ACCOUNT,
  },
  {
    icon: ResetPassword(),
    title: "Reset Password",
    link: ROUTES.RESET_PASSWORD,
  },
];

const Actions = () => {
  const navigate = useNavigate();

  return (
    <Stack flex={1} gap={1}>
      {actions.map(({ icon, title, link }) => (
        <Stack
          onClick={() => navigate(link)}
          sx={{ cursor: "pointer" }}
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
          <RightArrow />
        </Stack>
      ))}
    </Stack>
  );
};

export default Actions;

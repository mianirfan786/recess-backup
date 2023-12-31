import {IconButton} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useSignIn from "../hooks/useSignIn";

const Line = () => (
    <svg
        width="89"
        height="2"
        viewBox="0 0 89 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <line
            x1="0.0162354"
            y1="0.703816"
            x2="88.2362"
            y2="0.703823"
            stroke="white"
            strokeWidth="1.16079"
        />
    </svg>
);

const FaceBookIcon = () => (
    <svg
        width="59"
        height="59"
        viewBox="0 0 59 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="0.770752"
            y="0.0742798"
            width="58.0395"
            height="58.0395"
            rx="29.0197"
            fill="white"
        />
        <g clipPath="url(#clip0_306_652)">
            <path
                d="M32.1121 30.8352H35.0141L36.1749 26.192H32.1121V23.8705C32.1121 22.6748 32.1121 21.5489 34.4337 21.5489H36.1749V17.6486C35.7964 17.5987 34.3675 17.4861 32.8585 17.4861C29.7069 17.4861 27.4689 19.4095 27.4689 22.9418V26.192H23.9866V30.8352H27.4689V40.7019H32.1121V30.8352Z"
                fill="#111315"
            />
        </g>
        <defs>
            <clipPath id="clip0_306_652">
                <rect
                    width="27.8589"
                    height="27.8589"
                    fill="white"
                    transform="translate(15.861 15.1646)"
                />
            </clipPath>
        </defs>
    </svg>
);

const GoogleIcon = () => (
    <svg
        width="59"
        height="59"
        viewBox="0 0 59 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="0.543335"
            y="0.0742798"
            width="58.0395"
            height="58.0395"
            rx="29.0197"
            fill="white"
        />
        <g clipPath="url(#clip0_306_651)">
            <path
                d="M19.1903 23.8821C20.1561 21.9589 21.6377 20.3422 23.4695 19.2128C25.3012 18.0833 27.4111 17.4854 29.5631 17.4861C32.6914 17.4861 35.3194 18.6353 37.3288 20.51L34.0008 23.8391C32.797 22.6888 31.2671 22.1026 29.5631 22.1026C26.5392 22.1026 23.9797 24.1456 23.0685 26.8885C22.8363 27.585 22.704 28.3279 22.704 29.094C22.704 29.8601 22.8363 30.603 23.0685 31.2995C23.9809 34.0436 26.5392 36.0854 29.5631 36.0854C31.1244 36.0854 32.4535 35.6734 33.4935 34.9769C34.0965 34.5799 34.6127 34.0648 35.0109 33.4626C35.4091 32.8605 35.6811 32.1839 35.8105 31.4736H29.5631V26.9837H40.4954C40.6324 27.7428 40.7067 28.5345 40.7067 29.3575C40.7067 32.8933 39.4414 35.8695 37.2452 37.8893C35.3252 39.663 32.6972 40.7019 29.5631 40.7019C28.0385 40.7025 26.5288 40.4027 25.1202 39.8195C23.7116 39.2364 22.4317 38.3814 21.3537 37.3034C20.2757 36.2254 19.4207 34.9455 18.8376 33.5369C18.2544 32.1283 17.9546 30.6185 17.9552 29.094C17.9552 27.2205 18.4033 25.4491 19.1903 23.8821Z"
                fill="#111315"
            />
        </g>
        <defs>
            <clipPath id="clip0_306_651">
                <rect
                    width="27.8589"
                    height="27.8589"
                    fill="white"
                    transform="translate(15.6335 15.1646)"
                />
            </clipPath>
        </defs>
    </svg>
);

const AppleIcon = () => (
    <svg
        width="59"
        height="59"
        viewBox="0 0 59 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="0.316772"
            y="0.0742798"
            width="58.0395"
            height="58.0395"
            rx="29.0197"
            fill="white"
        />
        <g clipPath="url(#clip0_306_650)">
            <path
                d="M28.8999 23.5478C27.8831 23.5478 26.3091 22.3916 24.6515 22.4334C22.4645 22.4613 20.4587 23.701 19.3304 25.665C17.0599 29.6071 18.7454 35.4296 20.9601 38.6334C22.0466 40.1935 23.3282 41.9486 25.0276 41.8929C26.6573 41.8232 27.2702 40.8342 29.2482 40.8342C31.2122 40.8342 31.7694 41.8929 33.4967 41.8511C35.2518 41.8232 36.3661 40.2631 37.4387 38.6891C38.6784 36.8783 39.1938 35.1232 39.2217 35.0256C39.1799 35.0117 35.809 33.7163 35.7672 29.816C35.7393 26.5565 38.4277 24.9964 38.5531 24.9268C37.0208 22.6841 34.6667 22.4334 33.8449 22.3777C31.6998 22.2105 29.9029 23.5478 28.8999 23.5478V23.5478ZM32.5216 20.2604C33.427 19.1739 34.026 17.6556 33.8588 16.1512C32.5634 16.2069 31.0033 17.0148 30.07 18.1013C29.2342 19.0625 28.5099 20.6086 28.7049 22.0852C30.1397 22.1966 31.6162 21.3469 32.5216 20.2604V20.2604Z"
                fill="#111315"
            />
        </g>
        <defs>
            <clipPath id="clip0_306_650">
                <rect
                    width="27.8589"
                    height="27.8589"
                    fill="white"
                    transform="translate(15.407 15.1646)"
                />
            </clipPath>
        </defs>
    </svg>
);

const ContinueWithSocialMedia = ({sx}) => {
    const {handleGoogleSignIn,handleFacebookSignIn,handleAppleSignIn} = useSignIn();

    return (
        <Stack sx={{pt: 6, pb: 8}} spacing={2}>
            <Stack
                justifyContent="center"
                alignItems="center"
                direction="row"
                spacing={2}
            >
                <Line/>
                <Typography variant="subtitle2">or continue with</Typography>
                <Line/>
            </Stack>
            <Stack
                justifyContent="center"
                alignItems="center"
                direction="row"
                spacing={2}
            >
               
                <IconButton onClick={handleFacebookSignIn}>
                    <FaceBookIcon />
                </IconButton>
                <IconButton onClick={handleGoogleSignIn}>
                    <GoogleIcon/>
                </IconButton>
                <IconButton onClick={handleAppleSignIn}>
                    <AppleIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default ContinueWithSocialMedia;

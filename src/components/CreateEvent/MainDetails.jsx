import React, {useState} from "react";
import {Stack, Typography} from "@mui/material";
import Slider from "rc-slider";
import {useCreateEventContext} from "../../pages/CreateEvent";

const CostCard = ({active, children, onClick}) => {
    return (
        <Stack
            onClick={onClick}
            p={3}
            sx={{
                cursor: "pointer",
                minWidth: {xs: "60px", sm: "80px"},
                width: {xs: "60px", sm: "80px"},
                color: active ? "white" : "black",
                borderRadius: "20px",
                aspectRatio: "1/1",
                fontWeight: active ? "bold" : "normal",
                backgroundColor: active ? "#2DC6FF" : "#F6FBF9",
                border: active ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {children}
        </Stack>
    );
};

const DetailCard = ({title, children}) => {
    return (
        <Stack
            width="100%"
            borderRadius="15px"
            p={2}
            bgcolor="white"
            sx={{
                boxShadow: "0px 0.960653px 13.4491px rgba(233, 235, 248, 0.54);",
            }}
        >
            <Typography sx={{opacity: 0.5}} variant="body2">
                {title}
            </Typography>
            {children}
        </Stack>
    );
};

const prices = [0, 5, 10, 15];

const MainDetails = () => {
    const {
        title,
        description,
        date,
        startTime,
        endTime,
        keywords,
        maxParticipants,
        cost,
        address,
        displayAddress,
        setState,
    } = useCreateEventContext();

    const [customPrice, setCustomPrice] = useState("");

    const onCostCardClick = (price) => {
        setState((prev) => ({...prev, cost: price}));
        setCustomPrice("");
    };

    return (
        <Stack gap={4} width="100%">
            <Stack gap={2}>
                <DetailCard title="Title">
                    <input
                        style={{border: "none", outline: "none", fontSize: "16px"}}
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setState((prev) => ({...prev, title: e.target.value}))
                        }
                    />
                </DetailCard>
                <DetailCard title="Description">
          <textarea
              value={description}
              onChange={(e) =>
                  setState((prev) => ({...prev, description: e.target.value}))
              }
              rows={5}
              style={{
                  border: "none",
                  outline: "none",
                  fontSize: "16px",
                  resize: "none",
              }}
          />
                </DetailCard>
                {/* add detailcard for address */}
                <DetailCard title="Address">
                    <input
                        style={{border: "none", outline: "none", fontSize: "16px"}}
                        type="text"
                        value={displayAddress}
                        onChange={(e) =>
                            setState((prev) => ({...prev, displayAddress: e.target.value}))
                        }
                    />
                </DetailCard>

                <DetailCard title="Date">
                    <input
                        value={date}
                        onChange={(e) =>
                            setState((prev) => ({...prev, date: e.target.value}))
                        }
                        type="date"
                        style={{
                            border: "none",
                            outline: "none",
                            fontSize: "16px",
                        }}
                    />
                </DetailCard>
                <Stack gap={2} flexDirection="row">
                    <DetailCard title="Start Time">
                        <input
                            value={startTime}
                            onChange={(e) =>
                                setState((prev) => ({...prev, startTime: e.target.value}))
                            }
                            type="time"
                            style={{
                                border: "none",
                                outline: "none",
                                fontSize: "16px",
                            }}
                        />
                    </DetailCard>
                    <DetailCard title="End Time">
                        <input
                            value={endTime}
                            onChange={(e) =>
                                setState((prev) => ({...prev, endTime: e.target.value}))
                            }
                            type="time"
                            style={{
                                border: "none",
                                outline: "none",
                                fontSize: "16px",
                            }}
                        />
                    </DetailCard>
                </Stack>
                <DetailCard title="Keywords">
                    <input
                        value={keywords}
                        onChange={(e) =>
                            setState((prev) => ({...prev, keywords: e.target.value}))
                        }
                        style={{border: "none", outline: "none", fontSize: "16px"}}
                        type="text"
                    />
                </DetailCard>
            </Stack>
            <Stack textAlign="center" gap={2}>
                <Typography variant="h5">Max Players</Typography>
                <Slider
                    onChange={(value) =>
                        setState((prev) => ({...prev, maxParticipants: value}))
                    }
                    value={maxParticipants}
                />
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="body2">Min</Typography>
                    <Typography variant="body2">{maxParticipants}</Typography>
                    <Typography variant="body2">Max</Typography>
                </Stack>
            </Stack>
            <Stack textAlign="center" gap={3}>
                <Typography variant="h5">Participation Cost</Typography>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                    flexDirection="row"
                >
                    {prices.map((price, index) => {
                        const active = cost === price;

                        return (
                            <React.Fragment key={index}>
                                <CostCard
                                    active={active}
                                    onClick={() => onCostCardClick(price)}
                                >
                                    {price === 0 ? "Free" : `$${price}`}
                                </CostCard>
                                {index === prices.length - 1 && (
                                    <CostCard
                                        active={
                                            Number(customPrice) === cost &&
                                            !prices.includes(Number(customPrice))
                                        }
                                    >
                                        <input
                                            value={customPrice}
                                            onChange={(e) => {
                                                const {value} = e.target;
                                                setCustomPrice(value);
                                                setState((prev) => ({
                                                    ...prev,
                                                    cost: Number(e.target.value),
                                                }));
                                            }}
                                            style={{
                                                color: Number(customPrice) === cost ? "white" : "black",
                                                fontSize: "16px",
                                                width: "150%",
                                                border: "none",
                                                outline: "none",
                                                backgroundColor: "transparent",
                                            }}
                                            placeholder="|"
                                            type="number"
                                        />
                                    </CostCard>
                                )}
                            </React.Fragment>
                        );
                    })}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default MainDetails;

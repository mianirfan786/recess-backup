import DefaultModal from "./DefaultModal";
import { Stack, Typography } from "@mui/material";
import basketballTag from "../images/basketball-tag.png";

const tags = [...new Array(20)].map((_, i) => ({
  title: "Basketball",
  participants: 123,
  image: basketballTag,
  id: i + 1,
}));

const TagsModal = ({ open, onClose }) => {
  const onTagClick = (tag) => {
    onClose();
  };

  return (
    <DefaultModal open={open} onClose={onClose}>
      <Stack textAlign="center" gap={3}>
        <Typography variant="h4">Tags</Typography>
        <Stack
          flexWrap="wrap"
          maxHeight={{ xs: "50vh", sm: "500px" }}
          overflow="auto"
          flexDirection="row"
        >
          {tags.map((tag) => {
            const { id, title, participants, image } = tag;

            return (
              <Stack
                onClick={() => onTagClick(tag)}
                sx={{ cursor: "pointer" }}
                p={1}
                width={{ xs: "33%", sm: "25%", md: "20%" }}
                key={id}
                gap={1}
              >
                <Stack
                  width="100%"
                  borderRadius="20px"
                  p={2}
                  sx={{ backgroundColor: "#F6FBF9", aspectRatio: "1/1" }}
                >
                  <img
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    src={image}
                    alt={title}
                  />
                </Stack>
                <Typography fontWeight={500} variant="body1">
                  {title} ({participants})
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </DefaultModal>
  );
};

export default TagsModal;

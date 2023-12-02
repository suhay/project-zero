import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ProductDetails } from "@/constants";
import { CategoryStatusContext } from "@/src/context/context";
import { useContext } from "react";
import { Plus } from "react-feather";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PageModal({
  product,
  subCategory,
}: {
  product: ProductDetails;
  subCategory: { key: string; product: ProductDetails[]; status: string };
}) {
  const { setCategoryStatus } = useContext(CategoryStatusContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addToJourney = () => {
    //update current product's status to in progress
    product.status = "In Progress";
    //depends on subCategory's product length and each status
    const checkCompleteStatus = () => {
      return product.status === "In Progress";
    };
    const checkActiveStatus = () => {
      return product.status === "In Progress";
    };
    const isComplete = subCategory.product.every(checkCompleteStatus);
    const isActive = subCategory.product.some(checkActiveStatus);

    if (isComplete) {
      subCategory.status = "Hit all the basics";
      setCategoryStatus({
        category: subCategory.key,
        status: `Completed all ${subCategory.key}`,
      });
    } else {
      subCategory.status = "Not Started";
      setCategoryStatus({
        category: subCategory.key,
        status: `${subCategory.key} not started`,
      });
    }
    if (isActive) {
      subCategory.status = "Making progress";
      setCategoryStatus({
        category: subCategory.key,
        status: `Active improving ${subCategory.key} `,
      });
    }
    console.log("after update", subCategory);
  };
  return (
    <div>
      <Button
        sx={{
          backgroundColor: "#475956",
          width: "360px",
          "&:hover": {
            backgroundColor: "#172a28",
          },
          color: "white",
          fontStyle: "bold",
          margin: "auto",
          display: "block",
        }}
        onClick={handleOpen}
      >
        quick view
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Name
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, marginBottom: 3 }}
          >
            $price
          </Typography>
          <Button
            variant="outlined"
            onClick={addToJourney}
            sx={{
              backgroundColor: "#475956",
              width: "330px",
              "&:hover": {
                backgroundColor: "#172a28",
              },
              color: "white",
              fontStyle: "bold",
              margin: "auto",
              display: "flex",
              gap: 2,
            }}
          >
            <span className="my-auto">
              <Plus className="w-4 h-4" />
            </span>
            <span>add to your journey</span>
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

import * as React from "react";
import { signal } from "@preact/signals-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ProductDetails, STATUS } from "@/constants";
import { CategoryStatusContext, PantryContext } from "@/src/context/context";
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

//to pass to category page for checking status
export const sub = signal("default");

export default function PageModal({
  product,
  subCategory,
}: {
  product: ProductDetails;
  subCategory: { key: string; product: ProductDetails[]; status: string };
}) {
  // console.log("in PageModal", subCategory.key);
  const { setPantryProducts } = useContext(PantryContext);
  const { setCategoryStatus } = useContext(CategoryStatusContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addToJourney = () => {
    //update current product's status to active
    product.status = STATUS.ACTIVE;
    setPantryProducts([
      {
        key: subCategory,
        value: product,
      },
    ]);

    const checkCompleteStatus = () => {
      return subCategory.product.every(
        (product) => product.status === STATUS.ACTIVE,
      );
    };

    const checkActiveStatus = () => {
      return subCategory.product.some(
        (product) => product.status === STATUS.ACTIVE,
      );
    };

    //update category's status depends on current subCategory's product list length and each status
    if (checkCompleteStatus()) {
      subCategory.status = STATUS.COMPLETED;
      sub.value = subCategory.key; //to delete from improve products section
      setCategoryStatus({
        category: subCategory.key,
        status: `${STATUS.COMPLETED}(${subCategory.key})`,
      });
    } else if (checkActiveStatus()) {
      subCategory.status = STATUS.ACTIVE;
      setCategoryStatus({
        category: subCategory.key,
        status: `${STATUS.ACTIVE} (${subCategory.key})`,
      });
    } else {
      subCategory.status = STATUS.NONE;
      setCategoryStatus({
        category: subCategory.key,
        status: `${subCategory.key} not started`,
      });
    }
    // console.log("Modal after update", subCategory);
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

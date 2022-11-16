import { app } from "./app";
import UserService from "../service/User.service";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));

UserService.getAllUsers();
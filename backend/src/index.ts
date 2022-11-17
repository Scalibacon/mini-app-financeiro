import { app } from "./app";
import accountService from "./service/account.service";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
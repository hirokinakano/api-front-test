import axios from "axios"
import { CommentModel } from "../model/comment"

export async function client() {
    const res = await axios.get<CommentModel[]>("https://floating-caverns-71526.herokuapp.com/comments.json")
    console.log(res.data);
    return res.data
}
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CommentModel } from "../model/comment"
import axios from "axios";

type CommentForm = {
    body: string
}

export default function Comment() {
    const { register, errors, handleSubmit } = useForm<CommentForm>();
    const [comments, setComment] = useState<CommentModel[]>([])

    const onSubmit = async (data: CommentForm) => {
        const res = await axios.post<CommentModel>("https://floating-caverns-71526.herokuapp.com/comments.json", {body: data.body})
        setComment([...comments, res.data])
    }
    useEffect( () => {
        const fetch = async () => {
            const res = await axios.get<CommentModel[]>("https://floating-caverns-71526.herokuapp.com/comments.json")
            setComment(res.data)
        }
        fetch()
    }, [])

    return (
        <div>
            <h2>コメント一覧</h2>
            {comments.map(comment => (
                <li key={comment.id}>{comment.body}</li>
            ))}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="body" ref={register({ required: true, maxLength: 20 })} />
                <input type="submit" />
                {errors.body && <div>コメントは必須です</div>}
            </form>
        </div>
    );
}

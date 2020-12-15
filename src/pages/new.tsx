import { Layout } from "components/layout";
import React, { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Layout>
      <div>
        <form action="">
          <div className="py-2">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="py-2">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

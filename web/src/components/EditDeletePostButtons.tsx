import React from "react";
import { Box, IconButton, Link } from "@chakra-ui/core";

import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null
  }
    return (
      <Box>
        <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
          <IconButton
            borderRadius={20}
            as={Link}
            mr={4}
            icon="edit"
            aria-label="Edit Post"
          />
        </NextLink>
        <IconButton
          icon="delete"
          borderRadius={20}
          aria-label="Delete Post"
          onClick={() => {
            deletePost({ id });
          }}
        />
      </Box>
    );
};

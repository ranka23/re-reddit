import React, { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex alignItems="center" direction="column" justifyContent="center" mr={4}>
      <IconButton
        onClick={async () => {
          if(post.voteStatus === 1) {
            return;
          }

          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        
        isLoading={loadingState === "updoot-loading"}
        padding={0}
        variantColor={post.voteStatus === 1 ? 'green' : undefined}
        size="xs"
        borderRadius={20}
        icon="chevron-up"
        aria-label="up vote post"
        />
      <Text fontSize="sm" my={1} >{post.points}</Text>
      <IconButton
        padding={0}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
        borderRadius={20}
        size="xs"
        variantColor={post.voteStatus === -1 ? 'red' : undefined}
        icon="chevron-down"
        aria-label="down vote post"
      />
    </Flex>
  );
};
export default UpdootSection;

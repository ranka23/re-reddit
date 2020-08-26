import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import {useRouter} from 'next/router'

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter()
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={4}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex align='center'>
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>create post</Button>
        </NextLink>
        <Box mr={3}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload()
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex align='center' position="sticky" top={0} zIndex={9} bg={"tomato"} p={4} ml={"auto"}>
      <Flex flex={1} m='auto' align='center' maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading size='lg'>Re reddit</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
export default NavBar;

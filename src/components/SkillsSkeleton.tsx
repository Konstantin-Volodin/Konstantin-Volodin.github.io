import {
  Box, Container, Grid, Skeleton, SkeletonText, Center,
  Wrap, WrapItem, Flex, Divider, VStack
} from '@chakra-ui/react';

function SkillIconSkeleton() {
  return (
    <Flex align='center' direction='column' width='100px'>
      <Skeleton height='50px' width='100px' mb={3} />
      <SkeletonText noOfLines={1} spacing='4' skeletonHeight='16px' width='80px' />
    </Flex>
  );
}

function SkillCardSkeleton() {
  return (
    <Box width="300px" p={5} borderRadius="xl" shadow="md" borderWidth="1px">
      <VStack spacing={3} align="stretch">
        <VStack spacing={1}>
          <SkeletonText noOfLines={1} skeletonHeight='20px' width="60%" />
          <Divider />
        </VStack>
        <Wrap spacing={4} align='center' justify='center' mt={2}>
          {[1,2,3,4,5,6].map((i) => (
            <WrapItem key={i}>
              <SkillIconSkeleton />
            </WrapItem>
          ))}
        </Wrap>
      </VStack>
    </Box>
  );
}

function SkillsSkeleton() {
  return (
    <Box id='Skills' scrollMarginTop='5rem' borderTopWidth='1px' borderColor='border-subtle'
      sx={{
        bg: "gray.50",
        _dark: { bg: "gray.900" }
      }}
    >
      <Container maxW='container.lg' py={{ base: 16, md: 20 }}>
        <VStack spacing={12} align="stretch">
          <VStack spacing={2} align="center">
            <Skeleton height="36px" width="400px" />
            <SkeletonText noOfLines={2} spacing={2} skeletonHeight="16px" width="80%" maxW="550px" mt={2} />
          </VStack>

          <Center>
            <Grid
              width="min-content"
              columnGap={{ "base": "1rem", "md": "1.5rem", "xl": "2rem" }}
              rowGap={{ base: 4, md: 6 }}
              templateColumns={{ 'base': 'repeat(1,1fr)', 'md': 'repeat(2,1fr)', 'xl': 'repeat(3,1fr)' }}
            >
              {[1,2,3,4,5].map((i) => (
                <SkillCardSkeleton key={i} />
              ))}
            </Grid>
          </Center>
        </VStack>
      </Container>
    </Box>
  );
}

export default SkillsSkeleton;
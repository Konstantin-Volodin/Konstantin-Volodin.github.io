import {
  Box, Container, Heading, Grid, Skeleton, SkeletonText, Center,
  Wrap, WrapItem, Flex, Divider
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
    <Box width="300px">
      <SkeletonText noOfLines={1} spacing='4' skeletonHeight='28px' mb={2} />
      <SkeletonText noOfLines={1} spacing='4' skeletonHeight='24px' mb={4} />
      <Divider my={4} />
      
      <Wrap spacing={14} align='center' justify='center'>
        {[1,2,3,4,5,6].map((i) => (
          <WrapItem key={i}>
            <SkillIconSkeleton />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

function SkillsSkeleton() {
  return (
    <Box id='Skills' scrollMarginTop='5rem' borderTopWidth='1px' borderColor='slate.100'>
      <Container maxW='container.lg' py={'112px'}>
        <Heading maxW='500px' textTransform='none'>
          Knowledge & Skills
        </Heading>
        
        <Center mt={16}>
          <Grid width="min-content"
            columnGap={{ "base": "24", "xl": "32" }}
            rowGap={12}
            justifyContent='center'
            templateColumns={{ 'base': 'repeat(1,1fr)', 'md': 'repeat(2,1fr)', 'xl': 'repeat(3,1fr)' }}>
            {[1,2,3].map((i) => (
              <SkillCardSkeleton key={i} />
            ))}
          </Grid>
        </Center>
      </Container>
    </Box>
  );
}

export default SkillsSkeleton;
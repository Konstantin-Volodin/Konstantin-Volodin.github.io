import {
  Box, Container, Heading, Grid, Stack, Skeleton, SkeletonText,
  HStack, Tag, Spacer
} from '@chakra-ui/react';

function ProjectCardSkeleton() {
  return (
    <Box w='full' h='100%' display='flex' flexDirection='column'
         border='1px' borderColor='slate.200' rounded='none' bg='white' overflow='hidden'
         boxShadow='xs'
         minH={{ base: '340px', md: '360px' }}>
      
      {/* IMAGE placeholder */}
      <Skeleton flexShrink={0} h={{ base: '140px', md: '160px', lg: '180px' }} />
      
      {/* CONTENT */}
      <Stack p={{ base: '16px', md: '20px' }} spacing={3} flex={1}>
        <Tag size='sm' bg='slate.50' color='transparent' borderWidth='1px' borderColor='slate.200' rounded='none' w='80px'>
          <Skeleton height='12px' />
        </Tag>
        
        <SkeletonText noOfLines={2} spacing='4' skeletonHeight='20px' />
        
        <SkeletonText noOfLines={1} spacing='4' skeletonHeight='14px' />
        
        <Spacer />
        
        <Box>
          <SkeletonText noOfLines={1} spacing='4' skeletonHeight='12px' />
        </Box>
      </Stack>
    </Box>
  );
}

function ProjectsSkeleton() {
  return (
    <Box id='Projects' scrollMarginTop='5rem' borderTopWidth='1px' borderColor='slate.100'>
      <Container maxW='container.lg' py={'112px'}>
        <Heading maxW='500px' textTransform='none'>
          Projects
        </Heading>

        {/* Filter skeletons */}
        <HStack mt={5} spacing={2} flexWrap='wrap' alignItems='center'>
          <SkeletonText noOfLines={1} spacing='4' skeletonHeight='14px' w='50px' />
          {[1,2,3,4,5].map((i) => (
            <Tag key={i} rounded='none' px={3} py={1.5} bg='transparent' borderWidth='1px' borderColor='slate.200'>
              <Skeleton height='14px' width='60px' />
            </Tag>
          ))}
        </HStack>

        <HStack mt={3} spacing={2} flexWrap='wrap' alignItems='center'>
          <SkeletonText noOfLines={1} spacing='4' skeletonHeight='14px' w='80px' />
          {[1,2,3,4,5].map((i) => (
            <Tag key={i} rounded='none' px={3} py={1.5} bg='transparent' borderWidth='1px' borderColor='slate.200'>
              <Skeleton height='14px' width='50px' />
            </Tag>
          ))}
        </HStack>

        {/* Projects grid skeleton */}
        <Grid mt={8} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={16}>
          {[1,2,3,4].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProjectsSkeleton;
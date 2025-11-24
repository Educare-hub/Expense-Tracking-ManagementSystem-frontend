//src/components/about/testimonialdata.ts

import story1 from '../../assets/images/story1.jpg';
import story2 from '../../assets/images/story2.jpg';

type Testimonial = {
    id: number;
    name: string;
    role: string;
    image: string;
    content: string;
};

const resizeImage = (src: string, width: number, height: number) => {
    return Object.assign(new Image(), { src, width, height });
};

const story1Small = resizeImage(story1, 400, 260);
const story2Small = resizeImage(story2, 400, 260);

export const testimonialsData: Testimonial[] = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Financial Manager',
        image: story1Small.src,
        content:
            'ExpensePro has transformed the way I track and manage expenses. The intuitive interface and powerful reporting tools make financial management a breeze.',
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'Accountant',
        image: story2Small.src,
        content:
            'With ExpensePro, I can easily categorize and monitor expenses. It has significantly improved my efficiency and helped me stay on top of budgets.',
    },
    {
        id: 3,
        name: 'Michael Brown',
        role: 'UI/UX Designer',
        image: story1Small.src,
        content:
            'The clean design and user-friendly experience of ExpensePro make it my go-to tool for tracking both personal and business expenses.',
    },
    {
        id: 4,
        name: 'Emily Davis',
        role: 'QA Analyst',
        image: story2Small.src,
        content:
            'ExpensePro helps me keep track of financial transactions and recurring payments efficiently. Highly recommended for accurate budgeting!',
    },
    {
        id: 5,
        name: 'David Wilson',
        role: 'Finance Officer',
        image: story1Small.src,
        content:
            'Integrating ExpensePro into our workflow has streamlined expense reporting and improved team financial visibility.',
    },
    {
        id: 6,
        name: 'Sophia Lee',
        role: 'Product Owner',
        image: story2Small.src,
        content:
            'ExpensePro gives me a clear overview of spending patterns and helps prioritize budgets for the team effectively.',
    },
    {
        id: 7,
        name: 'Chris Martin',
        role: 'Operations Manager',
        image: story1Small.src,
        content:
            'I love how ExpensePro keeps all expense records organized and accessible from anywhere.',
    },
    {
        id: 8,
        name: 'Olivia Taylor',
        role: 'Backend Developer',
        image: story2Small.src,
        content:
            'ExpensePro’s reporting and analytics features have made monitoring our expenses seamless and efficient.',
    },
];

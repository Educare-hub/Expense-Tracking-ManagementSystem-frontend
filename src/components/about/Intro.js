import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//src/components/about/Intro.tsx
import story1 from '../../assets/images/story1.jpg';
import story2 from '../../assets/images/story2.jpg';
export const testimonialsData = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Financial Manager',
        image: story1,
        content: 'ExpensePro has transformed the way I track and manage expenses. The intuitive interface and powerful reporting tools make financial management a breeze.',
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'Accountant',
        image: story2,
        content: 'With ExpensePro, I can easily categorize and monitor expenses. It has significantly improved my efficiency and helped me stay on top of budgets.',
    },
    {
        id: 3,
        name: 'Michael Brown',
        role: 'UI/UX Designer',
        image: story1,
        content: 'The clean design and user-friendly experience of ExpensePro make it my go-to tool for tracking both personal and business expenses.',
    },
    {
        id: 4,
        name: 'Emily Davis',
        role: 'QA Analyst',
        image: story2,
        content: 'ExpensePro helps me keep track of financial transactions and recurring payments efficiently. Highly recommended for accurate budgeting!',
    },
    {
        id: 5,
        name: 'David Wilson',
        role: 'Finance Officer',
        image: story1,
        content: 'Integrating ExpensePro into our workflow has streamlined expense reporting and improved team financial visibility.',
    },
    {
        id: 6,
        name: 'Sophia Lee',
        role: 'Product Owner',
        image: story2,
        content: 'ExpensePro gives me a clear overview of spending patterns and helps prioritize budgets for the team effectively.',
    },
    {
        id: 7,
        name: 'Chris Martin',
        role: 'Operations Manager',
        image: story1,
        content: 'I love how ExpensePro keeps all expense records organized and accessible from anywhere.',
    },
    {
        id: 8,
        name: 'Olivia Taylor',
        role: 'Backend Developer',
        image: story2,
        content: 'ExpensePro’s reporting and analytics features have made monitoring our expenses seamless and efficient.',
    },
];
const Intro = () => {
    return (_jsxs("section", { className: "intro-section", children: [_jsx("h2", { className: "text-2xl font-bold text-center mb-4", children: "Our Story" }), _jsx("div", { className: "flex flex-wrap justify-center gap-6", children: testimonialsData.slice(0, 2).map((item) => (_jsxs("div", { className: "max-w-sm text-center", children: [_jsx("img", { src: item.image, alt: item.name, className: "rounded-lg shadow-md mb-3" }), _jsxs("p", { className: "text-gray-700 italic", children: ["\"", item.content, "\""] }), _jsx("p", { className: "mt-2 font-semibold", children: item.name }), _jsx("p", { className: "text-sm text-gray-500", children: item.role })] }, item.id))) })] }));
};
export default Intro;

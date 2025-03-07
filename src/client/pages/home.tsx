import {
	Box,
	Button,
	Container,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Text,
	VStack,
	useBreakpointValue,
	useDisclosure,
} from "@yamada-ui/react";
import { useState } from "react";
import {
	Fi,
	FiBriefcase,
	FiClock,
	FiGlobe,
	FiMenu,
	FiMoreVertical,
	FiSearch,
	FiStar,
	FiTrendingUp,
	FiUsers,
} from "react-icons/fi";

const RSSReader = () => {
	const [activeTab, setActiveTab] = useState("Everything");
	const { open, onOpen, onClose } = useDisclosure();
	const isMobile = useBreakpointValue({ base: false, sm: true, xs: true });

	const navItems = [
		{ label: "All" },
		{ label: "Unread" },
		{ label: "Starred" },
		{ label: "Trash" },
	];

	const subscriptions = [
		{ name: "Design Details", hasUnread: false },
		{ name: "Techmeme Ride Home", hasUnread: false },
		{ name: "The Information", hasUnread: true },
		{ name: "Benedict Evans Newsletter", hasUnread: false },
		{ name: "The Verge", hasUnread: false },
		{ name: "Stratechery by Ben Thompson", hasUnread: false },
		{ name: "Daring Fireball", hasUnread: false },
	];

	const feedItems = [
		{
			id: 1,
			title: "The Information's 2023 Predictions",
			publisher: "The Information",
			timeAgo: "2 hours ago",
			icon: <FiClock />,
		},
		{
			id: 2,
			title: "A new era for the internet",
			publisher: "The Information",
			timeAgo: "3 hours ago",
			icon: <FiGlobe />,
		},
		{
			id: 3,
			title: "The future of work",
			publisher: "The Information",
			timeAgo: "4 hours ago",
			icon: <FiBriefcase />,
		},
		{
			id: 4,
			title: "The Great Resignation",
			publisher: "The Information",
			timeAgo: "5 hours ago",
			icon: <FiUsers />,
		},
		{
			id: 5,
			title: "The rise of web3",
			publisher: "The Information",
			timeAgo: "6 hours ago",
			icon: <FiTrendingUp />,
		},
	];

	const tabs = [
		"Everything",
		"Today",
		"Yesterday",
		"Last 7 days",
		"Last 30 days",
		"Unread",
	];

	// Sidebar content component for reuse
	const SidebarContent = () => (
		<>
			<VStack align="stretch" py={2}>
				{navItems.map((item) => (
					<Button
						key={item.label}
						variant="ghost"
						justifyContent="flex-start"
						fontWeight={item.label === "All" ? "bold" : "normal"}
						bg={item.label === "All" ? "gray.200" : "transparent"}
						borderRadius="md"
						py={2}
					>
						{item.label}
					</Button>
				))}
			</VStack>

			<Text fontWeight="bold" mt={8} mb={4}>
				Subscriptions
			</Text>

			<VStack align="stretch" py={3}>
				{subscriptions.map((sub) => (
					<Flex key={sub.name} justify="space-between" align="center">
						<Text
							fontSize="sm"
							fontWeight={sub.hasUnread ? "medium" : "normal"}
						>
							{sub.name}
						</Text>
						<Button size="xs" variant="outline" fontSize="xs">
							Mark as read
						</Button>
					</Flex>
				))}
			</VStack>
		</>
	);

	return (
		<Container maxW="100%" p={0}>
			<Flex h="100vh" w="100%">
				{/* Desktop Sidebar */}

				<Box w="320px" p={4} display={{ base: "none", md: "block" }}>
					<SidebarContent />
				</Box>

				{/* Mobile Drawer */}
				<Drawer
					display={{ base: "flex", md: "none" }}
					open={open}
					placement="left"
					onClose={onClose}
					size="sm"
				>
					<DrawerOverlay bg="blackAlpha.300" />

					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
					<DrawerBody>
						<SidebarContent />
					</DrawerBody>
				</Drawer>

				{/* Main Content */}
				<Box flex={1} p={4} w="100%">
					{/* Mobile Menu Button */}
					<IconButton
						icon={<FiMenu />}
						variant="outline"
						onClick={onOpen}
						mb={4}
						aria-label="Open menu"
						display={{ base: "flex", md: "none" }}
					/>

					<Flex justify="space-between" align="center" mb={4}>
						<Text fontSize="2xl" fontWeight="bold">
							All items
						</Text>
						<Button size="sm" variant="outline">
							New Subscription
						</Button>
					</Flex>

					<InputGroup mb={6}>
						<InputLeftElement>
							<Icon as={FiSearch} color="gray.400" />
						</InputLeftElement>
						<Input placeholder="Search all items" bg="gray.100" border="none" />
					</InputGroup>

					<HStack p={2} mb={6} overflowX="auto">
						{tabs.map((tab) => (
							<Button
								key={tab}
								size="sm"
								variant="ghost"
								bg={activeTab === tab ? "gray.200" : "gray.100"}
								onClick={() => setActiveTab(tab)}
								borderRadius="full"
								px={4}
							>
								{tab}
							</Button>
						))}
					</HStack>

					<VStack align="stretch" p={3}>
						{feedItems.map((item) => (
							<Flex
								key={item.id}
								p={3}
								borderRadius="md"
								border="1px solid"
								borderColor="gray.200"
								align="center"
								justify="space-between"
							>
								<Flex align="center">
									<Flex
										w="40px"
										h="40px"
										bg="gray.200"
										borderRadius="md"
										align="center"
										justify="center"
										mr={3}
									>
										{item.icon}
									</Flex>
									<Box>
										<Text fontWeight="medium">{item.title}</Text>
										<Flex align="center" color="gray.500" fontSize="sm">
											<Text>{item.publisher}</Text>
											<Text mx={1}>·</Text>
											<Text>{item.timeAgo}</Text>
										</Flex>
									</Box>
								</Flex>
								<Icon as={FiMoreVertical} />
							</Flex>
						))}
					</VStack>
				</Box>
			</Flex>

			<Flex
				justify="center"
				borderTop="1px solid"
				borderColor="gray.200"
				p={4}
				bg="white"
			>
				<HStack p={8}>
					<Button variant="ghost">Feedback</Button>
					<Button variant="ghost">Help</Button>
					<Button variant="ghost">Terms</Button>
					<Button variant="ghost">Privacy</Button>
				</HStack>
			</Flex>
		</Container>
	);
};

export default RSSReader;

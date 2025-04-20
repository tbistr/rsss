import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export const CreateFeedForm = ({
	onSubmit,
}: {
	onSubmit: (title: string, url: string) => void;
}) => {
	const form = useForm({
		initialValues: {
			title: "",
			url: "",
		},

		validate: {
			title: (value) =>
				value.trim().length < 1 ? "タイトルを入力してください" : null,
			url: (value) =>
				/^(http|https):\/\/[^ "]+$/.test(value)
					? null
					: "有効なURLを入力してください",
		},
	});

	return (
		<Box
			maw={400}
			mx="auto"
			component="form"
			onSubmit={form.onSubmit((values) => {
				onSubmit(values.title, values.url);
			})}
		>
			<TextInput
				label="タイトル"
				placeholder="フィードのタイトル"
				{...form.getInputProps("title")}
				required
				mb="md"
			/>

			<TextInput
				label="RSS URL"
				placeholder="https://example.com/feed.xml"
				{...form.getInputProps("url")}
				required
				mb="md"
			/>

			<Button type="submit" fullWidth>
				登録
			</Button>
		</Box>
	);
};

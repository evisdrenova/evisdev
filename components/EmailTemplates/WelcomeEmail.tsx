import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  firstName?: string;
}

const WelcomeEmail = ({ firstName = "Nicole" }: WelcomeEmailProps) => {
  const previewText = `Thanks for subscribing to my blog ${firstName}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white m-auto font-sans">
          <Container className="mb-10 mx-auto p-5 max-w-[465px]">
            <Text className="text-start text-sm text-white">
              Hey {firstName}, <br />
            </Text>
            <Text className="text-start text-sm text-white leading-relaxed">
              Thanks for subscribing to my blog. I try and publish new blog
              posts every week, if there is something that you want me to write
              about, just mention on X at @evisdrenova.
            </Text>
            <Text className="text-start text-sm text-white">
              Thanks,
              <br />
              Evis
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;

import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import Footer from "../Footer";

interface WelcomeEmailProps {
  firstName?: string;
}

const WelcomeEmail = ({ firstName }: WelcomeEmailProps) => {
  const previewText = `Thanks for subscribing to my blog, ${firstName}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white m-auto font-sans">
          <Container className="mb-10 mx-auto p-5 max-w-[465px]">
            <Text className="text-start text-sm ">
              Hey {firstName}, <br />
            </Text>
            <Text className="text-start text-sm leading-relaxed">
              Thanks for subscribing to my blog. I try and publish new blog
              posts every week, so stay tuned for upcoming ones! You can also
              find me on X at @evisdrenova.
            </Text>
            <Text className="text-starttext-sm ">
              See you around,
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

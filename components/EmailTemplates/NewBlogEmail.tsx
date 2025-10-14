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
import Link from "next/link";

interface WelcomeEmailProps {
  firstName?: string;
  blogDescription?: string;
}

const WelcomeEmail = ({ firstName, blogDescription }: WelcomeEmailProps) => {
  const previewText = `New Blog!`;

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
              I just published a new blog about {blogDescription}. Check it out
            </Text>
            <Text className="text-start text-sm text-white">
              Thanks,
              <br />
              Evis
            </Text>
          </Container>
        </Body>
        <Footer />
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;

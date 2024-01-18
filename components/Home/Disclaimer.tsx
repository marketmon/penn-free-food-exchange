"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ButtonOnClick from "@/components/common/Button/ButtonOnClick";

export default function Disclaimer() {
  const storedOpenState = localStorage.getItem("disclaimerOpen");

  const [open, setOpen] = useState(
    storedOpenState ? JSON.parse(storedOpenState) : true
  );

  function onCloseDisclaimer() {
    localStorage.setItem("disclaimerOpen", JSON.stringify(false));
    setOpen(false);
  }

  return (
    open && (
      <div className="fixed items-center w-full h-full z-30 bg-slate-200/70 flex justify-center">
        <Card className="w-[700px] h-[350px] overflow-y-auto mx-12">
          <CardHeader>
            <CardTitle className="text-lg">
              Disclaimer: Safety Notice for Penn Free Food Exchange
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <p>
              Welcome to Penn Free Food Exchange, the online platform dedicated
              to fostering a community of no waste by connecting individuals
              with surplus food. We want to ensure that your experience on Penn
              Free Food Exchange is not only helpful but also safe. Please take
              a moment to review the following safety guidelines and
              precautions:
            </p>
            <br />
            <h5 className="font-extrabold">Food Sharing Assurance</h5>
            <ul className="list-disc pl-8">
              <li>
                As a user of Penn Free Food Exchange, you play a vital role in
                ensuring the quality and safety of the shared food.
              </li>
              <li>
                We encourage all food providers to uphold high standards of food
                handling and storage practices, ensuring freshness and
                preventing contamination.
              </li>
            </ul>
            <br />
            <h5 className="font-extrabold">
              The Bill Emerson Good Samaritan Act:
            </h5>
            <span className="italic">
              Individuals, businesses, non-profits and gleaners are protected
              from civil and criminal liability for donated food if:
            </span>
            <ul className="list-disc pl-8">
              <li>Qualifying food is donated and distributed in good faith.</li>
              <li>
                The food is donated to a non-profit and distributed to needy
                individuals at no charge.
              </li>
              <li>
                The food is not donated or distributed with gross negligence or
                intentional misconduct.
              </li>
              <li>
                For food recipients, exercise discretion and trust your
                instincts when accepting shared food items.
              </li>
            </ul>
            <br />
            <h5 className="font-extrabold">Embrace Personal Safety</h5>
            <ul className="list-disc pl-8">
              <li>
                Prioritize your personal safety by exercising caution and good
                judgment when arranging to pick up or distribute food.
              </li>
              <li>
                Share only the necessary personal information and consider
                meeting in public places or bringing a friend if meeting someone
                unfamiliar.
              </li>
            </ul>
            <br />
            <h5 className="font-extrabold">
              Reporting Negative Experiences and Concerns
            </h5>
            <ul className="list-disc pl-8">
              <li>
                We encourage users to report any negative experiences or issues
                encountered on the Penn Free Food Exchange platform.
              </li>
              <li>
                Please reach out to our dedicated support team to report any
                concerns, including offensive content, harmful behavior, or
                suspicious activities.
              </li>
            </ul>
            <br />
            <h5 className="font-extrabold">Encouraging Responsible Conduct</h5>
            <ul className="list-disc pl-8">
              <li>
                Embrace the Penn Free Food Exchange spirit by adhering to all
                applicable laws, regulations, and community guidelines while
                using our platform.
              </li>
              <li>
                Treat fellow users with kindness, respect, and empathy, ensuring
                a safe and supportive environment for everyone.
              </li>
            </ul>
            <br />
            <p>
              By joining Penn Free Food Exchange, you affirm that you have read,
              understood, and agreed to follow these safety guidelines and
              precautions. As Penn Free Food Exchange evolves, we may update
              this safety notice to better serve our community. We encourage you
              to check back periodically to stay informed of any changes.
            </p>
            <br />
            <p>
              Remember, your safety and well-being are paramount. Embrace the
              joy of sharing on Penn Free Food Exchange while practicing safety
              and spreading positivity to create a better world, one meal at a
              time.
            </p>
            <br />
            <p>Last updated: 9/26/23</p>
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-end">
              <ButtonOnClick
                variant="secondary"
                btnText="Close"
                onClick={onCloseDisclaimer}
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  );
}

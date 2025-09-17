import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="w-full h-8 bg-gradient-to-r from-orange-200 via-pink-200 to-orange-200 bg-[length:20px_100%] bg-repeat-x opacity-60 animate-pulse"></div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AnimatedSection>
          <section className="text-center mb-16">
            <div className="
            relative bg-gradient-to-br from-orange-100 to-pink-100
            rounded-3xl p-12 border-4 border-orange-200
            shadow-lg hover:shadow-xl transition-all duration-500
            hover:scale-[1.02] group
          ">
              {/* Decorative scalloped border effect */}
              <div className="
              absolute inset-0 rounded-3xl border-8 border-orange-200
              opacity-30 group-hover:opacity-50 transition-opacity duration-500
            "></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-center gap-8">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero-banner1.gif"
                    alt="Timeless Strokes Hero Left"
                    width={300}
                    height={100}
                    className="mx-auto shadow-md hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/images/hero-banner.jpg"
                    alt="Timeless Strokes Hero Right"
                    width={350}
                    height={100}
                    className="mx-auto shadow-md hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
              <h1 className="font-serif text-6xl text-gray-800 mb-4 text-balance animate-fade-in-up">
                Timeless Strokes
              </h1>
              <p className="text-xl text-gray-700 font-medium animate-fade-in-up animation-delay-300">
                Custom Banners for Every Occasion
              </p>
            </div>
          </section>
        </AnimatedSection>
        {/* <AnimatedSection>
          <section className="text-center mb-16">
            <div className="relative bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-12 border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
              
              <div className="absolute inset-0 rounded-3xl border-8 border-orange-200 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="overflow-hidden rounded-2xl mb-8 mx-auto w-fit">
                  <Image
                    src="/images/hero-banner.jpg"
                    alt="Timeless Strokes Hero"
                    width={400}
                    height={300}
                    className="mx-auto shadow-md hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <h1 className="font-serif text-6xl text-gray-800 mb-4 text-balance animate-fade-in-up">
                  Timeless Strokes
                </h1>
                <p className="text-xl text-gray-700 font-medium animate-fade-in-up animation-delay-300">
                  Custom Banners for Every Occasion
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection> */}
        <AnimatedSection delay={200}>
          <section className="mb-16">
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500">
              <h2 className="font-serif text-4xl text-center text-gray-800 mb-8">Sizing & Pricing</h2>
              <p className="text-center text-gray-600 mb-8 text-lg">Starting out prices for each size</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { size: "MINI", dimensions: "2'x3'", price: "$20", color: "bg-orange-200" },
                  { size: "SQUARE", dimensions: "3'x3'", price: "$25", color: "bg-orange-300" },
                  { size: "STANDARD", dimensions: "5'x3'", price: "$35", color: "bg-orange-400" },
                  { size: "LARGE", dimensions: "6'x3'", price: "$50", color: "bg-orange-500" },
                ].map((item, index) => (
                  <Card
                    key={item.size}
                    className="border-2 border-orange-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`${item.color} rounded-lg p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <h3 className="font-bold text-gray-800 text-lg">{item.size}</h3>
                        <p className="text-gray-700">{item.dimensions}</p>
                      </div>
                      <div className="border-t-2 border-dashed border-orange-300 pt-4">
                        <p className="font-serif text-2xl text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                          {item.price}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <AnimatedSection delay={300}>
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <h2 className="font-serif text-4xl text-gray-800 mb-6 text-center">Extras</h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-orange-200 pb-2 hover:bg-orange-50 transition-colors duration-300 rounded-lg px-2 py-1 group">
                  <span className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                    Characters - $5/per
                  </span>
                  <div className="flex gap-2">
                    <span className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer">
                      🧜‍♀️
                    </span>
                    <span className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer">
                      👸
                    </span>
                    <span className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer">
                      🐙
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-orange-200 pb-2 hover:bg-orange-50 transition-colors duration-300 rounded-lg px-2 py-1 group">
                  <span className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                    High Detail - $10/per
                  </span>
                  <div className="flex gap-2">
                    <span className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer">
                      🎨
                    </span>
                    <span className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer">
                      ✨
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b border-orange-200 pb-2 hover:bg-orange-50 transition-colors duration-300 rounded-lg px-2 py-1">
                  <span className="text-gray-700">Scalloped Edge - $5</span>
                  <div className="w-16 h-8 bg-orange-300 rounded-full border-2 border-orange-400 hover:bg-orange-400 transition-colors duration-300"></div>
                </div>

                <div className="flex justify-between items-center hover:bg-orange-50 transition-colors duration-300 rounded-lg px-2 py-1">
                  <span className="text-gray-700">Gingham/Checkered Border - $10</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-orange-300 border border-orange-400 hover:scale-110 transition-transform duration-300"></div>
                    <div className="w-4 h-4 bg-pink-300 border border-pink-400 hover:scale-110 transition-transform duration-300"></div>
                    <div className="w-4 h-4 bg-orange-300 border border-orange-400 hover:scale-110 transition-transform duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <h2 className="font-serif text-4xl text-gray-800 mb-6 text-center">Shipping</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-orange-200 pb-2 hover:bg-orange-50 transition-colors duration-300 rounded-lg px-2 py-1">
                  <span className="text-gray-700">Local Delivery to Riverton</span>
                  <Badge
                    variant="secondary"
                    className="bg-orange-200 text-gray-800 hover:bg-orange-300 transition-colors duration-300"
                  >
                    $3
                  </Badge>
                </div>

                <div className="flex justify-between items-center border-b border-orange-200 pb-2 hover:bg-orange-50 transition-colors duration-300 rounded-lg px-2 py-1">
                  <span className="text-gray-700">Local Delivery to Lander</span>
                  <Badge
                    variant="secondary"
                    className="bg-orange-200 text-gray-800 hover:bg-orange-300 transition-colors duration-300"
                  >
                    $5
                  </Badge>
                </div>

                <div className="flex justify-between items-center border-b border-orange-200 pb-2 hover:bg-orange-50 transition-colors duration-300 rounded-lg px-2 py-1">
                  <span className="text-gray-700">Local Delivery to Thermopolis</span>
                  <Badge
                    variant="secondary"
                    className="bg-orange-200 text-gray-800 hover:bg-orange-300 transition-colors duration-300"
                  >
                    $7
                  </Badge>
                </div>

                <div className="bg-orange-200 rounded-lg p-4 mt-6 hover:bg-orange-300 transition-colors duration-300">
                  <p className="text-center text-gray-800 font-medium">Flat Rate Shipping Cost Everywhere Else - $10</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={500}>
          <section className="mb-16">
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500">
              <h2 className="font-serif text-4xl text-center text-gray-800 mb-8">Example Work</h2>

              <div className="flex justify-center">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/images/example-work.jpg"
                    alt="Example custom banners"
                    width={600}
                    height={400}
                    className="shadow-md hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <AnimatedSection delay={600}>
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <h2 className="font-serif text-4xl text-gray-800 mb-6 text-center">Ordering</h2>
              <p className="text-center text-gray-600 mb-6">Direct Message</p>

              <div className="space-y-4">
                {[
                  "1. Occasion",
                  "2. Size",
                  "3. Color Scheme",
                  "4. Exact Wording",
                  "5. Date Needed",
                  "6. Inspo Pics",
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 hover:bg-orange-50 transition-colors duration-300 rounded-lg px-2 py-2 animate-fade-in-left"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center text-gray-800 font-bold hover:bg-orange-400 hover:scale-110 transition-all duration-300">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 font-serif text-lg">{step.substring(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={700}>
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <h2 className="font-serif text-4xl text-gray-800 mb-6 text-center">Payment</h2>

              <div className="space-y-4 text-center">
                <p className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-colors duration-300">
                  Venmo or PayPal Accepted
                </p>

                <p className="text-lg text-gray-700 font-medium hover:text-gray-800 transition-colors duration-300">
                  Must be paid at time of order
                </p>

                <div className="bg-orange-200 rounded-lg p-4 mt-6 hover:bg-orange-300 transition-colors duration-300">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    No refunds once you've approved the mock-up. If the mock-up hasn't been approved and you change your
                    mind, you will receive 80% of your order fee back. 20% will be kept for the mock-up design time and
                    labor.
                  </p>
                </div>

                <p className="text-xs text-gray-600 font-bold mt-4">
                  **Due to customizations, returns & refunds will not be accepted once banner is made**
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={800}>
          <section className="mb-16">
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500">
              <h2 className="font-serif text-4xl text-center text-gray-800 mb-8">Mockups</h2>

              <div className="max-w-4xl mx-auto space-y-6 text-center">
                <p className="text-lg text-gray-700 leading-relaxed hover:text-gray-800 transition-colors duration-300">
                  All orders include a mock-up of your design for your review and approval and two revisions (if
                  needed). Mock-ups need to be approved within 48 hours of it being sent to you or you risk rush feed.
                </p>

                <div className="bg-orange-200 rounded-lg p-6 hover:bg-orange-300 transition-colors duration-300">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Disclaimer:</strong> These are completely hand painted. It can be expected to have minor
                    imperfections and colors may vary slightly due to hand mixing of colors.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="font-serif text-2xl text-gray-800 mb-4">Example:</h3>
                  <div className="bg-gradient-to-br from-amber-100 to-blue-100 rounded-2xl p-6 border-4 border-blue-300 max-w-md mx-auto hover:scale-105 hover:shadow-lg transition-all duration-500 cursor-pointer group">
                    <div className="text-center">
                      <p className="font-serif text-lg text-gray-800 mb-2 group-hover:text-blue-800 transition-colors duration-300">
                        The Summer I Turned
                      </p>
                      <p className="font-serif text-3xl font-bold text-gray-800 group-hover:text-blue-800 transition-colors duration-300">
                        TWENTY
                      </p>
                      <div className="flex justify-center gap-2 mt-4">
                        <span className="text-2xl hover:scale-125 transition-transform duration-300">🐚</span>
                        <span className="text-2xl hover:scale-125 transition-transform duration-300">⭐</span>
                        <span className="text-2xl hover:scale-125 transition-transform duration-300">🌊</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={900}>
          <section className="text-center">
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-12 border-4 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
              <h2 className="font-serif text-4xl text-gray-800 mb-6">Ready to Order?</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
                Fill out our easy order form with your occasion, size, color scheme, exact wording, date needed, and
                inspiration pictures to get started!
              </p>
              <Link href="/order">
                <Button
                  size="lg"
                  className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-8 py-3 text-lg hover:scale-110 hover:shadow-lg transition-all duration-300 animate-bounce-subtle"
                >
                  Place Your Order
                </Button>
              </Link>
            </div>
          </section>
        </AnimatedSection>
      </div>

      <div className="w-full h-8 bg-gradient-to-r from-orange-200 via-pink-200 to-orange-200 bg-[length:20px_100%] bg-repeat-x opacity-60 animate-pulse"></div>
    </div>
  )
}


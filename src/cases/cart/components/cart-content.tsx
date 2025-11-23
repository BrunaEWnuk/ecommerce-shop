/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "../hooks/useCart";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormattedNumber, IntlProvider } from "react-intl";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapPin, Trash2 } from "lucide-react";

import { QuantityInput } from "@/components/ui/quantityInput";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function CartContent() {
  const cartContext = useCart();
    const { cart, removeProductCart, updateQuantity } = cartContext;
  const bucketBaseUrl = import.meta.env.VITE_BUCKET_BASE_URL;

  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(0);

  const totalProducts = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalPix = totalProducts * 0.9;
  const totalFinal = totalProducts + frete;

  function handleCalcFrete() {
    const validCep = /^[0-9]{8}$/;

    if (!validCep.test(cep)) {
      alert("CEP inválido. Use apenas números.");
      return;
    }

    setFrete(19.9);
  }

  return (
    <div className="flex gap-4">
      <Card className="w-full mt-8">
        <CardContent>
          <ItemGroup className="gap-4">
            {cart.items.map((item) => (
              <Item
                key={item.product.id}
                variant="muted"
                role="listitem"
                asChild
              >
                <div className="flex items-center gap-4">
                  <ItemMedia variant="image">
                    {item.product.photos?.length && (
                      <img
                        src={`${bucketBaseUrl}${item.product.photos[0].name}`}
                        className="w-8 h-8 object-cover grayscale"
                      />
                    )}
                  </ItemMedia>

                  <ItemContent>
                    <ItemTitle className="line-clamp-1">
                      {item.product.name}
                    </ItemTitle>

                    <ItemDescription>
                      {item.product.brand?.name}
                    </ItemDescription>
                    <QuantityInput
                      initialQuantity={item.quantity}
                        onChange={(qty) => updateQuantity?.(item.product.id!, qty)}
                    />
                  </ItemContent>
                  <ItemContent className="flex-none text-right">
                    <p className="font-semibold flex gap-2 items-baseline">
                      <IntlProvider locale="pt-BR">
                        <FormattedNumber
                          value={item.product.price * 0.9}
                          style="currency"
                          currency="BRL"
                        />
                      </IntlProvider>

                      <span className="font-semibold">no Pix</span>
                    </p>

                    <p className="font-light flex gap-2">
                      <IntlProvider locale="pt-BR">
                        <FormattedNumber
                          value={item.product.price}
                          style="currency"
                          currency="BRL"
                        />
                      </IntlProvider>

                      <span>no cartão</span>
                    </p>
                  </ItemContent>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeProductCart(item.product.id!)}
                      >
                        <Trash2 className="text-red-600" />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>Remover item do carrinho</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>

      <div className="flex flex-col w-md mt-8 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm"> Frete para CEP</CardTitle>
          </CardHeader>

          <CardContent>
            <InputGroup>
              <InputGroupInput
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                placeholder="Digite seu CEP"
              />

              <InputGroupAddon align="inline-end">
                <MapPin className="text-green-600" />
              </InputGroupAddon>

              <Button
                variant="ghost"
                size="sm"
                className="-mr-1 hover:bg-transparent hover:text-green-700"
                onClick={handleCalcFrete}
              >
                Calcular
              </Button>
            </InputGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm ">Total do Pedido</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <p className="flex justify-between">
              <span>Produtos:</span>
              <b>
                <IntlProvider locale="pt-BR">
                  <FormattedNumber
                    value={totalProducts}
                    style="currency"
                    currency="BRL"
                  />
                </IntlProvider>
              </b>
            </p>

            <p className="flex justify-between">
              <span>Frete:</span>
              <b>
                <IntlProvider locale="pt-BR">
                  <FormattedNumber
                    value={frete}
                    style="currency"
                    currency="BRL"
                  />
                </IntlProvider>
              </b>
            </p>

            <hr />

            <p className="flex justify-between text-lg font-bold">
              <span>Total no cartão:</span>
              <IntlProvider locale="pt-BR">
                <FormattedNumber
                  value={totalFinal}
                  style="currency"
                  currency="BRL"
                />
              </IntlProvider>
            </p>

            <p className="flex justify-between text-sm text-green-700 font-semibold">
              <span>Total no Pix:</span>
              <IntlProvider locale="pt-BR">
                <FormattedNumber
                  value={totalPix}
                  style="currency"
                  currency="BRL"
                />
              </IntlProvider>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

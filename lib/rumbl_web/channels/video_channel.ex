defmodule RumblWeb.VideoChannel do
  use RumblWeb, :channel

  def join("videos:" <> video_id, _params, socket) do
    # :timer.send_interval(5000, :ping)
    {:ok, assign(socket, :video_id, String.to_integer(video_id))}
  end

  def handle_in("new annotation", params, socket) do
    IO.inspect(socket.assigns, label: ">>>\n\n")

    broadcast!(socket, "new annotation", %{
      user: %{username: "anon"},
      body: params["body"],
      at: params["at"]
    })

    {:reply, :ok, socket}
  end

  def handle_info(:ping, socket) do
    count = socket.assigns[:count] || 1
    push(socket, "ping", %{count: count})
    {:noreply, assign(socket, :count, count + 1)}
  end
end
